# Integra Back-end solution

## Packaging overhaul

1. Install Docker 27 on Ubuntu 22 or similar
2. Run on `bash`:
```bash
docker rm -f backtest | \
docker build -t back:unclean . && \
docker run --name backtest --rm back:unclean
```