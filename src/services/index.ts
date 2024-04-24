import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Contact } from "@/types/index.type";
import { API, QUERY_KEY } from "@/constants/index";
import { getFullName } from "../utils/string-helper";

type Response<T> = {
  message: string;
  data: T;
};

type ContactPayload = Partial<Omit<Contact, "id">>;

export const useGetContactQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.CONTACT.ALL],
    queryFn: async () => {
      return await axios.get<Response<Contact[]>>(API.CONTACT);
    },
  });

  return {
    contacts:
      query.data?.data.data
        .sort((a, b) => a.firstName.localeCompare(b.firstName))
        .map((contact) => ({
          ...contact,
          fullName: getFullName(contact.firstName, contact.lastName),
        })) || [],
    ...query,
  };
};

export const useGetDetailContactQuery = (id?: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.CONTACT.BY_ID, id],
    queryFn: async () => {
      return await axios.get<Response<Contact>>(API.CONTACT_DETAIL(id));
    },
    enabled: !!id,
  });

  return {
    contact: {
      ...query.data?.data.data,
      fullName: getFullName(query.data?.data.data.firstName, query.data?.data.data.lastName),
    },
    ...query,
  };
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (payload: ContactPayload) => {
      return axios.post(API.CONTACT, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT.ALL] });
    },
  });

  return query;
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (contactId: string) => {
      return axios.delete(API.CONTACT_DETAIL(contactId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT.ALL] });
    },
  });

  return query;
};

type UpdateContactParams = {
  contactId: string;
  payload: ContactPayload;
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ contactId, payload }: UpdateContactParams) => {
      return axios.put(API.CONTACT_DETAIL(contactId), payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT.ALL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT.BY_ID, variables.contactId] });
    },
  });

  return query;
};
