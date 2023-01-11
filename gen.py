combinations = []

# Generate all combinations from 000000 to 999999
for i in range(1000000):
    combinations.append(str(i).zfill(6))

with open('combinations.txt', 'w') as f:
    for combination in combinations:
        f.write(combination + '\n')

print('Done!')