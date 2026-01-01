import { create } from "zustand"
import instance from "../lib/axios";

export interface BankProduct {
	[key: string]: any;
}

interface MessageStore {
	// State Arrays
	millenia: BankProduct[];

	// Setters
	setmillenia: (data: BankProduct[]) => void;

	// Async Actions
	getMillenia: () => Promise<void>;
}

export const useMessagesStoreHDFC = create<MessageStore>((set, get) => ({

	millenia: [],
	setmillenia: (data) => set({ millenia: data }),

	getMillenia: async () => {
		try {
			const res = await instance.get('/hdfc/millenia');
			if (res.data) {
				set({ millenia: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching Millenia data:', error);
		}
	},
}))
