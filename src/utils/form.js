export const resetForm = (input, setModalOpen) => {
  input.value = input.defaultValue
  setModalOpen(false)
}
