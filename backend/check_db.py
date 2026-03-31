import sqlite3

def check_schema():
    try:
        conn = sqlite3.connect('gated_community.db')
        cursor = conn.cursor()
        
        # Get columns for residents table
        cursor.execute("PRAGMA table_info(residents)")
        columns = cursor.fetchall()
        
        print("Columns in 'residents' table:")
        found_house_number = False
        for col in columns:
            print(f"- {col[1]} ({col[2]})")
            if col[1] == 'house_number':
                found_house_number = True
        
        if found_house_number:
            print("\nSUCCESS: 'house_number' column found.")
        else:
            print("\nFAILURE: 'house_number' column NOT found. Likely still has 'unit_number'.")
            
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_schema()
