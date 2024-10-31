'use-client'

import { FormControl } from "@/components/ui/form";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConnectedFormType } from "@/forms/form-config";
import { FormProps } from "@/forms/type-info";
import { serverGetByTableName } from "@/trpc/client/client";
import { Select } from "@radix-ui/react-select";
import { ControllerRenderProps } from "react-hook-form";

type ConnectedFormProps<T extends object> = FormProps<T, any, "Model"> & { type: ConnectedFormType };

interface ConnectedFormItemProps<T extends object> {
    props: ConnectedFormProps<T>;
    field: ControllerRenderProps<{
        [x: string]: any;
    }, string>;
}


/**
 * Renders a connected form item component.
 *
 * @template T - The type of the object.
 * @param {ConnectedFormItemProps<T>} props - The props for the connected form item component.
 * @param {FormProps<T, any, "Model">} props.props - The form props.
 * @param {ControllerRenderProps<{ [x: string]: any; }, string>} props.field - The field controller render props.
 * @return {JSX.Element} The connected form item component.
 */
export default function ConnectedFormItem<T extends object>({
    props,
    field,
}: ConnectedFormItemProps<T>) {
    const { connected_table, connected_value, connected_label } = props.type;
    const useQuery = serverGetByTableName<any>(connected_table);
    const { data: connectedData, status } = useQuery();
    console.log("The default value is", field.value);

    return (
        <>
            {status === "loading" && 
            <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
            }
            {
                status === "error" && 
                <div className="flex items-center justify-center">Error</div>
            }
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
