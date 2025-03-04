package secretsmigrations

import (
	"context"

	"github.com/grafana/grafana/pkg/cmd/grafana-cli/runner"
	"github.com/grafana/grafana/pkg/cmd/grafana-cli/utils"
)

func ReEncryptDEKS(_ utils.CommandLine, runner runner.Runner) error {
	return runner.SecretsService.ReEncryptDataKeys(context.Background())
}

func ReEncryptSecrets(_ utils.CommandLine, runner runner.Runner) error {
	return runner.SecretsMigrator.ReEncryptSecrets(context.Background())
}

func RollBackSecrets(_ utils.CommandLine, runner runner.Runner) error {
	return runner.SecretsMigrator.RollBackSecrets(context.Background())
}
