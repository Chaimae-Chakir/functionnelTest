import SessionService from "user/service/SessionService";

const token = SessionService.getToken();
export const headerConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
