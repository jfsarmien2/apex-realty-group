const user = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from user route...",
  });
};

export default user;
