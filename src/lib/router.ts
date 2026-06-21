import { writable } from 'svelte/store';

function createRouter() {
  const { subscribe, set } = writable<string>(getInitialPath());

  function getInitialPath(): string {
    return window.location.pathname + window.location.search + window.location.hash;
  }

  function navigate(path: string, replace = false) {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    set(path);
  }

  function back() {
    window.history.back();
  }

  function init() {
    set(getInitialPath());
    window.addEventListener('popstate', () => {
      set(getInitialPath());
    });
  }

  return { subscribe, navigate, back, init };
}

export const router = createRouter();

export function navigate(path: string, replace = false) {
  router.navigate(path, replace);
}

export function back() {
  router.back();
}

export function currentPath(): string {
  return window.location.pathname;
}

export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}
