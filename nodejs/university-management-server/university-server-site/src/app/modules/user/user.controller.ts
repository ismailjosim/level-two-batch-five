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

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(201).json({
      success: true,
      message: 'All Users Data Fetched Successfully!',
      total: result.length,
      result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There Was An Error While Getting User.',
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(201).json({
      success: true,
      message: 'Found User with id ' + id,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There was an error getting the User',
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
        error,
      });
    }
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteSingleUserFromDB(id);
    res.status(201).json({
      success: true,
      message: 'User is Deleted successfully. ID: ' + id,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'There was an error creating the User',
        error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
        error,
      });
    }
  }
};

// export user controllers
export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
};
