#include <iostream>
#include <vector>
#include <string.h>
#include <string>

int main(int argc, char **argv) {
    std::string ops;
    if (argc == 1) {
        std::string line;
        while (std::getline(std::cin, line)) {
            ops.append(line);
        }

        if (ops.empty()) {
            std::cerr << "No input given";
            return 1;
        }
    } else {
        ops.assign(argv[1], strlen(argv[1]));
    }

    int len = ops.length();
    std::vector<char> tape = { 0 };
    int oix = 0;
    int tix = 0;
    while (oix < len) {
        switch (ops[oix]) {
            case '>':
                tix++;
                if (tix >= tape.size()) {
                    tape.push_back(0);
                }

                oix++;
                break;
            case '<':
                tix--;
                if (tix < 0) {
                    std::cerr << "Out of bounds";
                    return 1;
                }

                oix++;
                break;
            case '+':
                tape[tix]++;
                oix++;
                break;
            case '-':
                tape[tix]--;
                oix++;
                break;
            case '.':
                std::cout << tape[tix];
                oix++;
                break;
            case ',':
                std::cin >> tape[tix];
                oix++;
                break;
            case '[':
                if (tape[tix] == 0) {
                    int ls = 0;
                    int rs = 0;
                    for (int i = oix; i < len; i++) {
                        switch (ops[i]) {
                            case '[':
                                ls++;
                                break;
                            case ']':
                                rs++;
                                break;
                            default:
                                break;
                        }

                        if (ls == rs) {
                            oix = i + 1;
                            break;
                        }
                    }
                } else {
                    oix++;
                }

                break;
            case ']':
                if (tape[tix] != 0) {
                    int ls = 0;
                    int rs = 0;
                    for (int i = oix; i >= 0; i--) {
                        switch (ops[i]) {
                            case '[':
                                ls++;
                                break;
                            case ']':
                                rs++;
                                break;
                            default:
                                break;
                        }

                        if (ls == rs) {
                            oix = i + 1;
                            break;
                        }
                    }
                } else {
                    oix++;
                }

                break;
            default:
                oix++;
        }
    }

    return 0;
}
