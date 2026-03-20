const GITHUB_TREE_SEGMENT = '/tree/main/';

function trimTrailingSlash(value) {
  return typeof value === 'string' ? value.replace(/\/+$/, '') : '';
}

function trimSlashes(value) {
  return typeof value === 'string' ? value.replace(/^\/+|\/+$/g, '') : '';
}

export function buildSquadSourceUrl(source) {
  const repository = trimTrailingSlash(source?.repository);
  if (!repository) {
    return '#';
  }

  const directory = trimSlashes(source?.directory);
  if (!directory) {
    return repository;
  }

  try {
    const repositoryUrl = new URL(repository);
    if (repositoryUrl.hostname.toLowerCase() !== 'github.com') {
      return repository;
    }
  } catch {
    return repository;
  }

  return `${repository}${GITHUB_TREE_SEGMENT}${directory}`;
}
