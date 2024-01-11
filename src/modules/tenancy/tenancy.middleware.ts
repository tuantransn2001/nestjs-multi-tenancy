import { Request, Response, NextFunction } from 'express';

const TENANT_HEADER = 'x-tenant-id';

export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const tenantId = req.headers[TENANT_HEADER];

  if (!tenantId) {
    res.status(400).json({
      message: `Header key ${TENANT_HEADER} is required`,
    });
  }

  req['tenantId'] = tenantId as string;

  next();
};
