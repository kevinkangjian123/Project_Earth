import pandas as pd
file_path = 'PCD GM Scorecard 202601 vf.xlsx'
xl = pd.ExcelFile(file_path)
with open('excel_summary.txt', 'w') as f:
    f.write(f"Sheet names: {xl.sheet_names}\n\n")
    for sheet in xl.sheet_names:
        f.write(f"\n--- Sheet: {sheet} ---\n")
        df = xl.parse(sheet)
        df.dropna(how='all', axis=0, inplace=True)
        df.dropna(how='all', axis=1, inplace=True)
        # Convert to string and write, max 50 rows
        f.write(df.head(50).to_string())
        f.write("\n")
