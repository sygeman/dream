import axios from 'axios';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema) {
  console.log('Executor ran for Build', options);
  const rancherUrl = process.env['RANCHER_URL'];
  const rancherToken = process.env['RANCHER_TOKEN'];
  const clusterId = process.env['CLUSTER_ID'];
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
  } catch (error) {
    return { success: false };
  }

  return { success: true };
}
