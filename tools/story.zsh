#!/bin/zsh


echo "Converting features into md"
echo ''

features=( $(find features/ -type f -name "*.feature") )

for feature in $features; do;
    local feature_name=$(basename "$feature")
    local file_name=${feature_name%.feature}

    gherkin2markdown "$feature" "wiki/dev/$file_name"

    if [ $? -eq 0 ]; then
    else
        echo -n "\033[0;31mERROR\033[0m:\t$feature"
        continue
    fi

    python tools/md_shift.py "wiki/dev/$file_name.md"  "wiki/dev/$file_name.md" 2

    if [ $? -eq 0 ]; then
        echo "\033[0;32mOK(Shifted)\033[0m:\t$feature"
    else
        echo "\033[0;31mERROR\033[0m:\t$feature"
    fi
done;
