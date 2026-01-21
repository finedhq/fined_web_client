import { create } from "zustand"
import axios from "axios";
import instance from "../lib/axios";

// 1. Define the interface for your data and actions
export interface BankProduct {
	[key: string]: any;
}

interface MessageStore {
	// State Arrays
	savings: BankProduct[];
	fd: BankProduct[];
	taxsaverfd: BankProduct[];
	rd: BankProduct[];
	ppf: BankProduct[];
	nps: BankProduct[];
	unnaticard: BankProduct[];
	simplysave: BankProduct[];
	kotaksavings: BankProduct[];
	hdfcsavings: BankProduct[];
	digihdfcsavings: BankProduct[];
	maxhdfcsavings: BankProduct[];
	hdfcfd: BankProduct[];
	icicisavings: BankProduct[];
	icicibasicsavings: BankProduct[];
	iciciyoungsavings: BankProduct[];
	icicifd: BankProduct[];
	icicird: BankProduct[];
	kotakace: BankProduct[];
	hdfcrd: BankProduct[];
	hdfcmoney: BankProduct[];

	// Setters
	setsavings: (data: BankProduct[]) => void;
	setfd: (data: BankProduct[]) => void;
	settaxsaverfd: (data: BankProduct[]) => void;
	setrd: (data: BankProduct[]) => void;
	setppf: (data: BankProduct[]) => void;
	setnps: (data: BankProduct[]) => void;
	setunnaticard: (data: BankProduct[]) => void;
	setsimplysave: (data: BankProduct[]) => void;
	setkotaksavings: (data: BankProduct[]) => void;
	sethdfcsavings: (data: BankProduct[]) => void;
	setdigihdfcsavings: (data: BankProduct[]) => void;
	setmaxhdfcsavings: (data: BankProduct[]) => void;
	sethdfcfd: (data: BankProduct[]) => void;
	seticicisavings: (data: BankProduct[]) => void;
	seticicibasicsavings: (data: BankProduct[]) => void;
	seticiciyoungsavings: (data: BankProduct[]) => void;
	seticicifd: (data: BankProduct[]) => void;
	seticicird: (data: BankProduct[]) => void;
	setkotakace: (data: BankProduct[]) => void;
	sethdfcrd: (data: BankProduct[]) => void;
	sethdfcmoney: (data: BankProduct[]) => void;

	// Async Actions
	getSBISavings: () => Promise<void>;
	getSBIfd: () => Promise<void>;
	getSBITaxSaverfd: () => Promise<void>;
	getSBIrd: () => Promise<void>;
	getSBIppf: () => Promise<void>;
	getSBInps: () => Promise<void>;
	getSBIUnnatiCard: () => Promise<void>;
	getSBISimplySave: () => Promise<void>;
	getKotakSavings: () => Promise<void>;
	getHDFCSavings: () => Promise<void>;
	getHDFCDigiSavings: () => Promise<void>;
	getHDFCMaxSavings: () => Promise<void>;
	getHDFCFD: () => Promise<void>;
	getICICISavings: () => Promise<void>;
	getICICIBasicSavings: () => Promise<void>;
	getICICIYoungSavings: () => Promise<void>;
	getICICIFD: () => Promise<void>;
	getICICIrd: () => Promise<void>;
	getkotakace: () => Promise<void>;
	getHDFCrd: () => Promise<void>;
	getHDFCmoney: () => Promise<void>;
}

export const useMessagesStore = create<MessageStore>((set, get) => ({

	savings: [],
	setsavings: (data: any) => set({ savings: data }),
	fd: [],
	setfd: (data: any) => set({ fd: data }),
	taxsaverfd: [],
	settaxsaverfd: (data: any) => set({ taxsaverfd: data }),
	rd: [],
	setrd: (data: any) => set({ rd: data }),
	ppf: [],
	setppf: (data: any) => set({ ppf: data }),
	nps: [],
	setnps: (data: any) => set({ nps: data }),
	unnaticard: [],
	setunnaticard: (data: any) => set({ unnaticard: data }),
	simplysave: [],
	setsimplysave: (data: any) => set({ simplysave: data }),
	kotaksavings: [],
	setkotaksavings: (data: any) => set({ kotaksavings: data }),
	hdfcsavings: [],
	sethdfcsavings: (data: any) => set({ hdfcsavings: data }),
	digihdfcsavings: [],
	setdigihdfcsavings: (data: any) => set({ digihdfcsavings: data }),
	maxhdfcsavings: [],
	setmaxhdfcsavings: (data: any) => set({ maxhdfcsavings: data }),
	hdfcfd: [],
	sethdfcfd: (data: any) => set({ hdfcfd: data }),
	icicisavings: [],
	seticicisavings: (data: any) => set({ icicisavings: data }),
	icicibasicsavings: [],
	seticicibasicsavings: (data: any) => set({ icicibasicsavings: data }),
	iciciyoungsavings: [],
	seticiciyoungsavings: (data: any) => set({ iciciyoungsavings: data }),
	icicifd: [],
	seticicifd: (data: any) => set({ icicifd: data }),
	icicird: [],
	seticicird: (data: any) => set({ icicird: data }),
	kotakace: [],
	setkotakace: (data: any) => set({ kotakace: data }),
	hdfcrd: [],
	sethdfcrd: (data: any) => set({ hdfcrd: data }),
	hdfcmoney: [],
	sethdfcmoney: (data: any) => set({ hdfcmoney: data }),


	getSBISavings: async () => {
		try {
			const res = await instance.get('/sbi/savings');
			if (res.data) {
				set({ savings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching Savings data:', error);
		}

	},

	getSBIfd: async () => {
		try {
			const res = await instance.get('/sbi/fd');
			if (res.data) {
				set({ fd: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getSBITaxSaverfd: async () => {
		try {
			const res = await instance.get('/sbi/taxsaverfd');
			if (res.data) {
				set({ taxsaverfd: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching Savings data:', error);
		}

	},

	getSBIrd: async () => {
		try {
			const res = await instance.get('/sbi/rd');
			if (res.data) {
				set({ rd: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getSBIppf: async () => {
		try {
			const res = await instance.get('/sbi/ppf');
			if (res.data) {
				set({ ppf: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getSBInps: async () => {
		try {
			const res = await instance.get('/sbi/nps');
			if (res.data) {
				set({ nps: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getSBIUnnatiCard: async () => {
		try {
			const res = await instance.get('/sbi/unnaticard');
			if (res.data) {
				set({ unnaticard: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getSBISimplySave: async () => {
		try {
			const res = await instance.get('/sbi/simplysave');
			if (res.data) {
				set({ simplysave: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getKotakSavings: async () => {
		try {
			const res = await instance.get('/kotak/savings');
			if (res.data) {
				set({ kotaksavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getHDFCSavings: async () => {
		try {
			const res = await instance.get('/hdfc/savings');
			if (res.data) {
				set({ hdfcsavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getHDFCDigiSavings: async () => {
		try {
			const res = await instance.get('/hdfc/digisave');
			if (res.data) {
				set({ digihdfcsavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getHDFCMaxSavings: async () => {
		try {
			const res = await instance.get('/hdfc/maxsave');
			if (res.data) {
				set({ maxhdfcsavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getHDFCFD: async () => {
		try {
			const res = await instance.get('/hdfc/fd');
			if (res.data) {
				set({ hdfcfd: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getICICISavings: async () => {
		try {
			const res = await instance.get('/icici/savings');
			if (res.data) {
				set({ icicisavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getICICIBasicSavings: async () => {
		try {
			const res = await instance.get('/icici/basicsavings');
			if (res.data) {
				set({ icicibasicsavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getICICIYoungSavings: async () => {
		try {
			const res = await instance.get('/icici/youngsavings');
			if (res.data) {
				set({ iciciyoungsavings: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getICICIFD: async () => {
		try {
			const res = await instance.get('/icici/fd');
			if (res.data) {
				set({ icicifd: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getICICIrd: async () => {
		try {
			const res = await instance.get('/icici/rd');
			if (res.data) {
				set({ icicird: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}

	},

	getkotakace: async () => {
		try {
			const res = await instance.get('/kotak/acesavings');
			if (res.data) {
				set({ kotakace: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching FD data:', error);
		}
	},

	getHDFCmoney: async () => {
		try {
			const res = await instance.get('/hdfc/moneyback');
			if (res.data) {
				set({ hdfcmoney: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching Moneyback data:', error);
		}
	},

	getHDFCrd: async () => {
		try {
			const res = await instance.get('/hdfc/rd');
			if (res.data) {
				set({ hdfcrd: res.data });
			}
		}
		catch (error) {
			console.error('Error fetching RD data:', error);
		}
	},

}))
