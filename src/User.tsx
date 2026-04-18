type User = {
    id: number;
    name: {
        first: string,
        last: string
    };
}

const testUsersPayload: (i?: number) => User[] = (i = 2) => {
    const out: User[] = [];
    while (i--) {
        out.push({ id: Math.round((Math.random() + Math.random() + Math.random()) * (1 + Math.random() + Math.random()) ** (Math.random() + 1)), name: {first: ["John", "Jane"][Math.round(Math.random())], last: "Doe"}});
    }
    return out;
};

export type { User }
export { testUsersPayload }