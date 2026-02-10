export type SystemSetting = {
  key: string;
  value: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateSystemSettingRequest = {
  key: string;
  value: string;
  description?: string;
};

export type UpdateSystemSettingRequest = {
  value?: string;
  description?: string;
};
