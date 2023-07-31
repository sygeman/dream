import * as querystring from "querystring";
import axios from "axios";
import { prisma } from "./prisma";
import * as spotifyConfig from "@/config/spotify";

const spotifyApiUri = "https://api.spotify.com/v1/";
const spotifyAuthUri = "https://accounts.spotify.com/api/";

export class SpotifyService {
  public async onModuleInit() {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (error.response.status === 401 && !config._retry) {
          config._retry = true;

          const authorization = config.headers["authorization"] || "";

          const accessToken = authorization.split(" ")?.[1];

          const profile = await prisma.profile.findFirst({
            where: { accessToken },
          });

          if (!profile) throw "Profile not found";

          const newAccessToken = await this.refreshToken(profile.userId);

          return axios({
            ...config,
            headers: {
              ...config.headers,
              authorization: `Bearer ${newAccessToken}`,
            },
          });
        }

        return Promise.reject(error);
      }
    );
  }

  async getToken(userId: string) {
    const profile = await prisma.profile.findFirst({
      where: { userId },
    });

    return profile?.accessToken || "";
  }

  async refreshToken(userId: string) {
    console.log("refreshToken", userId);
    const profile = await prisma.profile.findFirst({
      where: { userId, provider: "spotify" },
    });

    if (!profile) throw "Profile not found";

    const { refreshToken } = profile;

    const { clientId, clientSecret } = spotifyConfig;
    const token = Buffer.from(clientId + ":" + clientSecret).toString("base64");

    const res = await axios.post(
      `${spotifyAuthUri}token`,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          // <base64 encoded client_id:client_secret>
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const accessToken = res?.data?.access_token;

    if (!accessToken) {
      throw new Error("fail");
    }

    await prisma.profile.update({
      where: { id: profile.id },
      data: { accessToken },
    });

    return accessToken;
  }

  async getMePlayer(userId: string) {
    const token = await this.getToken(userId);

    return axios.get(`${spotifyApiUri}me/player`, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  async getTrack(trackId: string, userId: string) {
    const token = await this.getToken(userId);

    return axios.get(`${spotifyApiUri}tracks/${trackId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  async setTrack(trackId: string, userId: string, position: number) {
    const token = await this.getToken(userId);

    return axios.put(
      `${spotifyApiUri}me/player/play`,
      {
        uris: [`spotify:track:${trackId}`],
        position_ms: position,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  }

  async pause(userId: string) {
    console.log("pause", userId);

    const token = await this.getToken(userId);

    console.log("token", token);

    return axios.put(`${spotifyApiUri}me/player/pause`, undefined, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  async getFormatedTrack(trackId: string, userId: string) {
    const track = await prisma.spotifyTrack.findUnique({
      where: { id: trackId },
    });

    if (track) return track;

    const trackData = (await this.getTrack(trackId, userId))?.data;

    if (!trackData) throw "Track not found";

    // Set track to queue
    const images = trackData?.album?.images || [];

    return prisma.spotifyTrack.create({
      data: {
        id: trackId,
        title: trackData?.name,
        artists: (trackData?.artists || [])
          .map((artist: any) => artist?.name)
          .join(", "),
        cover: images[images.length - 1]?.url,
        duration: trackData?.duration_ms,
      },
    });
  }
}

export const spotifyService = new SpotifyService();
