import React from "react";
import { Story, Meta } from "@storybook/react";
import { Carousel, CarouselProps } from "../../components/Complex/Carousel";

export default {
  title: "Complex/Carousel",
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: "Loop a series of images or texts in a limited space.",
      },
    },
  },
  argTypes: {
    children: { control: "" },
  },
} as Meta;

const Template: Story<CarouselProps> = (args) => {
  return (
    <Carousel {...args}>
      <img
        src="https://images.unsplash.com/photo-1627306048309-016c7794fef8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        alt=""
      />
      <img
        src="https://images.unsplash.com/photo-1586227740560-8cf2732c1531?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1656&q=80"
        alt=""
      />
      <img
        src="https://images.unsplash.com/photo-1627336284014-0a8b0ccd3534?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"
        alt=""
      />
    </Carousel>
  );
};

export const Default = Template.bind({});
Default.args = {
  arrow: "hover",
  height: 350,
  width: "auto",
  autoplay: true,
  initialIndex: 0,
  interval: 3000,
  loop: true,
  pauseOnHover: true,
};
