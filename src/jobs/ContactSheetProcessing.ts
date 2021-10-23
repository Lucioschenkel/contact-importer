interface IData {
  file: string;
  user_id: string;
  columns_names: {
    name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    address: string;
    credit_card: string;
  };
}

export default {
  key: "ContactSheetProcessing",
  async handle({ file, user_id, columns_names }: IData) {
    console.log(file, user_id);
    console.log(columns_names);
  },
};
