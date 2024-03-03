import axios from "axios";

type CreateNewContactArgs = {
    email: string,
    lastName: string,
    firstName: string,
    message: string,
}

const createNewContact = async ({
    email,
    lastName,
    firstName,
    message,
}: CreateNewContactArgs) => {
    const url = "https://api.brevo.com/v3/contacts";
    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

    try {
        const result = await axios.post(url,
            {
                email: email,
                attributes: {
                    "LASTNAME": lastName,
                    "FIRSTNAME": firstName,
                    "MESSAGE": message,
                },
                listIds: [7],
            },
            {
                headers: {
                    Accept: "application/json",
                    'content-type': 'application/json',
                    'api-key': brevoApiKey,
                }
            }    
        );

        if (result.status === 201) {
            return { status: 'success', data: result.data };
        } else {
            return { status: 'error', data: null };
        }
    } catch (err) {
        console.error(err);
        return { status: 'error', data: null };
    }
};

export default createNewContact;