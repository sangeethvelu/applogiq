import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc, serverTimestamp} from "firebase/firestore";
import { db } from "../../firebase";
import { faker } from "@faker-js/faker";
import axios from "axios";

const userApi = createApi({
    reducerPath: "users",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            async queryFn() {
                try {
                    const userCollectionRef = collection(db, "users");
                    const querySnapshot = await getDocs(userCollectionRef);
                    let usersData = [];
                    querySnapshot?.forEach((doc) => {
                      usersData.push({
                        ...doc.data(),
                        id: doc.id,
                      });
                    });
                    return { data: usersData };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ["User"]
        }),
        addUser: builder.mutation({ 
            async queryFn() {
              try {
                const apiCall = await axios.post("https://dummyjson.com/users/add", {
                    maidenName: faker.name.firstName(),
                    age: Math.ceil(Math.random() * (75 - 18) + 18),
                    bloodGroup: "AB-",
                    phone: faker.phone.number('+## ### ### ####'),
                    email: faker.internet.exampleEmail()
                });
                const data = apiCall.data;
                await addDoc(collection(db, "users"), {
                  ...data,
                  timestamp: serverTimestamp(),
                });
                return { data: usersData}
              } catch (err) {
                return { error: err ? err : null };
              }
            },
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation({
          async queryFn(id) {
            try {
              await deleteDoc(doc(db, "users", id));
              return { data: usersData}
            } catch (err) {
                return { error: err }
            }
          },
          invalidatesTags: ["User"]
        }),
        updateUser: builder.mutation({
          async queryFn(data) {
            try {
              await updateDoc(doc(db, "users", data.id), {
                age: data.age,
                bloodGroup: data.bloodGroup,
                email: data.email,
                maidenName: data.name,
                phone: data.phone
              })
              return { data: usersData }
            } catch (err) {
              return { error: err }
            }
          },
          invalidatesTags: ["User"]
        })
    }),
})

export const { useFetchUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } = userApi;
export { userApi };
