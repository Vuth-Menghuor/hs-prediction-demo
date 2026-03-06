export function useClipboard(timeout = 1500) {
  const copied = ref(false);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    copied.value = true;

    setTimeout(() => (copied.value = false), timeout);
  }

  return { copied, copy };
}
