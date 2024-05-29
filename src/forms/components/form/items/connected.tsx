'use-client'

import { FormControl } from "@/components/ui/form";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConnectedFormType } from "@/forms/form-config";
import { FormProps } from "@/forms/type-info";
import { serverGetByTableName } from "@/trpc/client/client";
import { Select } from "@radix-ui/react-select";
import { ControllerRenderProps } from "react-hook-form";

type ConnectedFormProps<T extends object> = FormProps<T, any, "Model"> & { type: ConnectedFormType };

export default function ConnectedFormItem<T extends object>({
    props,
    field,
}: {
    props: ConnectedFormProps<T>;
    field: ControllerRenderProps<{
        [x: string]: any;
    }, string>
}) {
    const { connected_table, connected_value, connected_label } = props.type;
    const useQuery = serverGetByTableName<any>(connected_table);
    const { data: connectedData, status } = useQuery();
    console.log("The default value is", field.value)
    return (
        <>
            {status === "success" ?

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {connectedData.map((obj) => (
                            <SelectItem key={obj[connected_value].toString()} value={obj[connected_value].toString()}>{obj[connected_label]}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                : null}
        </>
    );

}