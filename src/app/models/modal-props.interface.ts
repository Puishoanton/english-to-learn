export interface IModalField {
  label: string;
  value: string;
  initialValue?: string
}

export interface IModalProps<T> {
  title: string,
  fields: IModalField[],
  handleSave: (formData: T) => void,
  handleCancel: () => void,
  handleDelete?: () => void
}
