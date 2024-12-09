import { Request, Response } from 'express';
import userSchemaValidation from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validationData = userSchemaValidation.parse(userData);
    const result = await UserServices.createUserIntoDB(validationData);

    // send response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There Was An Error While Creating User.',
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'An Unexpected Error Occurred.',
        error,
      });
    }
  }
};

// export user controllers
export const UserControllers = {
  createUser,
};
