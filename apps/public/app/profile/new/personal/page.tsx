"use client";
import { $UpwithCrowd_Members_SaveMemberDto, UpwithCrowd_Members_SaveMemberDto } from "@ayasofyazilim/saas/upwithcrowdService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";

type names = keyof typeof $UpwithCrowd_Members_SaveMemberDto.properties;
type formObject = Partial<Record<names, string>>;

export default function page() {
    const resources: formObject = {
        idType: "ID Type 23423",
    }
    const uiResource = Object.keys(resources).reduce((acc, key) => {
        const _key = key as names;
        const accKey = `Form.${key}`;
        Object.assign(acc, {
            [accKey]: resources[_key]
        });
        return acc;
    }, {});
    const $Schema = $UpwithCrowd_Members_SaveMemberDto;
    const uiSchema = createUiSchemaWithResource({
        resources: uiResource,
        schema: $Schema,
    });
    return <div>
        <SchemaForm<UpwithCrowd_Members_SaveMemberDto>
            className="flex flex-col gap-4"
            schema={$Schema}
            uiSchema={uiSchema}
            onSubmit={(data) => {
                console.log(data.formData);
             }}
        />
    </div>;
}