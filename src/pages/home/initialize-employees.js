import employees from 'public/employee';
import config from '../../config';
import {Url, Util, axiosInstance} from '../../utils/index';

/**
 * initialize employees
 * @returns {Promise<any>}
 */
export default function () {
  //   Replace this with your own database of employees.
  //   1. Replace facewall/static/employee.json file in the following format:
  //    [
  //      {
  //        "email": "aschwartz@hubspot.com",
  //        "firstName": "Adam",
  //        "lastName": "Schwartz",
  //        "role": "Principal Software Engineer"
  //      }
  //    ]

  //   2. You may use a URL which returns JSON in the upper format, and the response should be:
  //  {data: {status: true, data: employees}
  //  return axiosInstance.get(Url.ALL_EMPLOYEES);

  employees.forEach(v => { v.id = Util.uuid(); });
  config.randomOrderingEmployees && employees.sort(() => Math.random() - 0.5);
  return new Promise((resolve, reject) => {
    resolve(employees);
  });
}
