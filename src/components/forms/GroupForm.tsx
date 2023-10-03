"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { groups } from "@/db/schema/groups";
import { Button } from "../ui/button";
import { GroupFormFields, formFields } from "./GroupFormFields";

const formSchema = createInsertSchema(groups);
export type FormSchema = z.infer<typeof formSchema>;

export function GroupForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });


  const handleValidSubmit = (data: FormSchema) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <div className="mx-auto p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleValidSubmit)}
          className="space-y-8"
        >
          <GroupFormFields control={form.control} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
