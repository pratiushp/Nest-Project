export const successCallback = async (
  res: any,
  status: string,
  message: string,
  data: object | undefined,
) => {
  const responseData = {
    status,
    message,
    data,
  };
  return res.status(200).send(responseData);
};
