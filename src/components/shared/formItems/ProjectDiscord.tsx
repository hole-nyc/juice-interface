import { Form, Input } from 'antd'

import { FormItemExt } from './formItemExt'

export default function ProjectDiscord({
  name,
  hideLabel,
  formItemProps,
}: FormItemExt) {
  return (
    <Form.Item
      name={name}
      label={hideLabel ? undefined : 'Discord'}
      extra=""
      {...formItemProps}
    >
      <Input
        placeholder="https://discord.gg/abcdefgh"
        type="string"
        autoComplete="off"
      />
    </Form.Item>
  )
}
