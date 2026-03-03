import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MaterialSymbolIcon from "./MaterialSymbolIcon.vue";

describe("MaterialSymbolIcon", () => {
  it("renderiza un path válido para el ícono solicitado", () => {
    const wrapper = mount(MaterialSymbolIcon, {
      props: { name: "menu" },
    });

    const path = wrapper.find("path");

    expect(path.exists()).toBe(true);
    expect(path.attributes("d")).toBeTruthy();
  });

  it("mantiene aria-hidden para uso decorativo", () => {
    const wrapper = mount(MaterialSymbolIcon, {
      props: { name: "close" },
    });

    expect(wrapper.attributes("aria-hidden")).toBe("true");
  });
});
