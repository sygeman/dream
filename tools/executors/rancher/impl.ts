import type { ExecutorContext } from '@nrwl/devkit';
import axios from 'axios';

export interface EchoExecutorOptions {
  project: string;
  app: string;
}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const rancherUrl = process.env['RANCHER_URL'];
  const rancherToken = process.env['RANCHER_TOKEN'];
  const clusterId = process.env['CLUSTER_ID'];
  const projectId = process.env['PROJECT_ID'];
  const namespace = options.project;
  const deployment = options.app;
  const tag = process.env['IMAGE_TAG'];
  const dockerImage = `ghcr.io/sygeman/dream/${options.project}-${options.app}:${tag}`;

  try {
    console.log(`Pull ${dockerImage}`);

    await axios.patch(
      `${rancherUrl}/k8s/clusters/${clusterId}/apis/apps/v1/namespaces/${namespace}/deployments/${deployment}`,
      [
        {
          op: 'replace',
          path: '/spec/template/spec/containers/0/image',
          value: dockerImage,
        },
      ],
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
          Authorization: 'Bearer ' + rancherToken,
        },
      }
    );

    console.log(`Redeploy ${options.project}:${options.app}`);

    await axios.post(
      `${rancherUrl}/v3/projects/${clusterId}:${projectId}/workloads/deployment:${namespace}:${deployment}?action=redeploy`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + rancherToken,
        },
      }
    );
  } catch (error) {}

  return { success: true };
}
