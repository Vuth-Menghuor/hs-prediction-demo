/**
 * Home Layout Composable
 * Manages the layout state (welcome view vs response view)
 */

import { computed } from "vue";
import type { Ref } from "vue";

export interface UseHomeLayoutOptions {
  rawResponse: Ref<any | null>;
}

export function useHomeLayout({ rawResponse }: UseHomeLayoutOptions) {
  /**
   * Determines which view should be displayed
   * - Welcome view: when no response exists
   * - Response view: when response exists
   */
  const showWelcomeView = computed(() => !rawResponse.value);
  const showResponseView = computed(() => !!rawResponse.value);

  return {
    showWelcomeView,
    showResponseView,
  };
}
