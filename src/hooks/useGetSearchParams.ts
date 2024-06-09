import { useSearchParams } from "react-router-dom";

type ParamValue = string | number;
type ParamsType = { [key: string]: ParamValue | ParamValue[] };

export default function useGetSearchParams() {
  const [searchParams] = useSearchParams();
  
  const params: ParamsType = {};
  
  searchParams.forEach((value, key) => {
    if (Array.isArray(params[key])) {
      (params[key] as ParamValue[]).push(value);
    } else if (params[key]) {
      params[key] = [params[key] as ParamValue, value];
    } else {
      params[key] = value;
    }
  });

  return params;
}
