export type SignUpFormValues = {
  email: string;
  password: string;
  fullName: string;
};

/**  Server에 nickname 필드가 없기 때문에 fullName 필드에 nickname을 담아서 전송*/
export type SignUpParams = {
  email: string;
  password: string;
  fullName: string;
};
