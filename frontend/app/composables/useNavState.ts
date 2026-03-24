import { ref } from "vue";

export function useNavState() {
  const activeItem = ref<string | null>(null);
  const activeChild = ref<string | null>(null);

  function setActive(value: string) {
    activeItem.value = value;
    activeChild.value = null;
  }

  function setActiveChild(value: string) {
    activeChild.value = value;
    activeItem.value = null;
  }

  return { activeItem, activeChild, setActive, setActiveChild };
}
