import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

test('attached_assets directory is resolvable from server files', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(__dirname, '..', '..');
  const assets = path.resolve(repoRoot, 'attached_assets');
  assert.equal(fs.existsSync(assets), true);
});

