export type VotingOptionType = {
    id: string;       // e.g. "option_1"
    label: string;    // e.g. "Tak"
    votes: number;    // counter
};

export type VotingType = {
    id: string;
    question: string;
    options: VotingOptionType[];
    votedBy: string[];   // array of user.id who already voted
    active: boolean;
    createdAt: number;   // Date.now()
};