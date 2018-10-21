import { UserInputError } from 'apollo-server-express';

export default (err) => {
  if (err) {
    const validationErrors = {};
    switch (err.name) {
      case 'ValidationError':
        for (let field in err.errors) {
          validationErrors[field] = err.errors[field].message;
        }
        throw new UserInputError(
          'Some of your data is not valid.',
          { validationErrors }
        );
      default:
        console.log(err)
        throw new Error('Something went wrong!');
    }
  }
}