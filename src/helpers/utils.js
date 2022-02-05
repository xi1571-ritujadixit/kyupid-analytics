export const capitalizeFirstLetter = (string = "") => {
    if (string) {
        return string
            .split(" ")
            .map((word) => {
                return `${word?.[0]?.toUpperCase()}${word
                    .slice(1)
                    .toLowerCase()}`;
            })
            .join(" ");
    }
};
