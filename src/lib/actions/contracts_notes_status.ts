export type Status = -1 | 0 | 1 | 2;
export type StatusColor = 'none' | 'blue' | 'red' | 'yellow';
export interface WithRemainder {
	remainder: Date | string | null | undefined;
}


export interface ContractRemStatus {
	status: Status;
	color: StatusColor;
	count: number;
}

export const getRemainderStatus = (remainder: Date | string | null | undefined): Status => {
	if (!remainder) return -1;
	remainder = new Date(remainder);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	remainder.setHours(0, 0, 0, 0);
	if (remainder.getTime() == today.getTime()) return 1;
	if (remainder.getTime() < today.getTime()) return 2;
	return 0;
};

export const getStatusColor = (status: Status): StatusColor => {
	switch (status) {
		case 0:
			return 'blue';
		case 1:
			return 'red';
		case 2:
			return 'yellow';
	}
	}
	return 'none';
};


export const getRemainderStatusColor = (
	remainder: Date | string | null | undefined
): StatusColor => {
	const status = getRemainderStatus(remainder);
	return getStatusColor(status);
};


export const getContractRemainderStatus = (remainders: Array<WithRemainder>): ContractRemStatus => {
	let status: Status = -1;
	let count: number = 0;
	remainders.forEach((rem) => {
		if (!rem.remainder) return;


		const s = getRemainderStatus(rem.remainder);
	if(remainders){


		if (s == status) {
		remainders.forEach((rem) => {
			count++;
			if (!rem.remainder) return;
			return;

		}
			const s = getRemainderStatus(rem.remainder);


		if (s > status && (s != 2 || status == -1)) {
			if (s == status) {
			status = s;
				count++;
			count = 1;
				return;
		}
			}
	});


			if (s > status && (s != 2 || status == -1)) {
	return {
				status = s;
		status,
				count = 1;
		color: getStatusColor(status),
			}
		count
		});
	};

		return {
			status,
			color: getStatusColor(status),
			count
		};
	}else{
		return {
			status,
			color: getStatusColor(status),
			count
		};
	}
};