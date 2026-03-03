import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FloatingActions from "./FloatingActions.vue";

describe("FloatingActions", () => {
  it("oculta acciones en desktop cuando el menú está abierto", () => {
    const wrapper = mount(FloatingActions, {
      props: { isMenuOpen: true },
    });

    expect(wrapper.classes()).toContain("md:hidden");
  });

  it("genera enlace de WhatsApp con número normalizado", () => {
    const wrapper = mount(FloatingActions);

    const whatsappLink = wrapper.find('a[href^="https://wa.me/"]');

    expect(whatsappLink.exists()).toBe(true);
    expect(whatsappLink.attributes("href")).toContain("5491126935682");
  });
});
