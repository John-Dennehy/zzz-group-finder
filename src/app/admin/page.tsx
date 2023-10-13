import { allGroups } from "@/db";
import { GroupCard } from "@/components/GroupCard";
import { Input, InputProps } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default async function Home() {
  const data = await allGroups;

  const defaultInputProps: InputProps = {
    size: "md",
    labelPlacement: "outside-left",
    isClearable: true,
    fullWidth: false,
    classNames: {
      label: " text-sm text-default-700 font-semibold  w-40 align-middle",
      input: "text-default-900 w-full",
      base: "min-w-[200px]",
      clearButton: "text-default-500 hover:text-default-900",
      mainWrapper: "flex flex-col gap-1",
    },
  } as const;

  const UrlPrefix = (
    <div className="pointer-events-none flex items-center">
      <span className="text-default-400 text-small">https://</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg text-primary">Admin Page</h2>
      <Card className="flex flex-col gap-4 p-4 w-auto mx-auto">
        <form className="flex flex-col flex-wrap md:flex-nowrap md:mb-0 gap-4 ">
          <Input
            {...defaultInputProps}
            type="text"
            label="Group name"
            isRequired
          />
          <Input {...defaultInputProps} type="text" label="Group description" />
          <Input {...defaultInputProps} type="url" label="Logo url" />
          <Input {...defaultInputProps} type="url" label="Website" />
          <Input
            {...defaultInputProps}
            type="text"
            label="Location"
            isRequired
          />
          <Input {...defaultInputProps} type="text" label="Tags" />
          <Input {...defaultInputProps} type="tel" label="Phone" />

          <Button className="w-full" color="primary" size="md">
            Submit
          </Button>
        </form>
      </Card>
      <ul className="flex mx-auto gap-2 flex-wrap">
        {data.map((group) => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul>
    </div>
  );
}
