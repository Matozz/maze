import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Progress, ProgressProps } from "../../components/Feedback/Progress";
import { Button } from "../../components/Inputs/Button";

export default {
  title: "Feedback/Progress",
  component: Progress,
  parameters: {
    docs: {
      description: {
        component:
          "Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.",
      },
    },
  },
  argTypes: {
    active: {
      description: "Control the popup open state.",
      control: " ",
      type: { name: "string", required: false },
      defaultValue: false,
    },
    clickToClose: {
      description: "Control progress can be closed by clicking the mask.",
      control: " ",
      type: { name: "string", required: false },
      defaultValue: false,
    },
    children: { control: "" },
  },
} as Meta;

const Template: Story<ProgressProps> = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Progress
        active={loading}
        handleMaskClose={(status) => status === "closed" && setLoading(false)}
      />
      <Button
        label={loading ? "Hide Loading" : "Show Loading"}
        onClick={() => setLoading(!loading)}
      ></Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};