export interface IModalField {
  label: string;
  value: string;
  initialValue?: string
}

export interface IModalProps {
  title: string,
  fields: IModalField[],
  handleSave: (formData: Record<string, string>) => void,
  handleCancel: () => void,
  handleDelete?: () => void
}
