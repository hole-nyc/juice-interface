import { Button, Form, FormInstance, Space } from 'antd'
import { FormItems } from 'components/shared/formItems'
import { useState } from 'react'
import { normalizeHandle } from 'utils/formatHandle'
import { cidFromUrl, unpinIpfsFileByCid } from 'utils/ipfs'

export type ProjectFormFields = {
  name: string
  description: string
  infoUri: string
  handle: string
  logoUri: string
  twitter: string
  discord: string
  payButton: string
  payDisclosure: string
}

export default function ProjectForm({
  form,
  onSave,
}: {
  form: FormInstance<ProjectFormFields>
  onSave: VoidFunction
}) {
  const [handle, setHandle] = useState<string>()

  return (
    <Space direction="vertical" size="large">
      <h1>Your project info</h1>

      <Form form={form} layout="vertical">
        <FormItems.ProjectName
          name="name"
          formItemProps={{
            rules: [{ required: true }],
          }}
          onChange={name => {
            const val = name ? normalizeHandle(name) : ''
            // Use `handle` state to enable ProjectHandle to validate while typing
            setHandle(val)
            form.setFieldsValue({ handle: val })
          }}
        />
        <FormItems.ProjectHandle
          name="handle"
          value={handle}
          onValueChange={val => form.setFieldsValue({ handle: val })}
          requireState="notExist"
          formItemProps={{
            rules: [{ required: true }],
            dependencies: ['name'],
          }}
        />
        <FormItems.ProjectDescription name="description" />
        <FormItems.ProjectLink name="infoUri" />
        <FormItems.ProjectTwitter name="twitter" />
        <FormItems.ProjectDiscord name="discord" />
        <FormItems.ProjectPayButton name="payButton" />
        <FormItems.ProjectPayDisclosure name="payDisclosure" />
        <FormItems.ProjectLogoUri
          name="logoUri"
          initialUrl={form.getFieldValue('logoUri')}
          onSuccess={logoUri => {
            const prevUrl = form.getFieldValue('logoUri')
            // Unpin previous file
            form.setFieldsValue({ logoUri })
            if (prevUrl) unpinIpfsFileByCid(cidFromUrl(prevUrl))
          }}
        />
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            onClick={async () => {
              await form.validateFields()
              onSave()
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
