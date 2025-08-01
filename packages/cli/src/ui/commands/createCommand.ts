/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommandKind, OpenDialogActionReturn, SlashCommand } from './types.js';

export const createCommand: SlashCommand = {
  name: 'create',
  description: 'DEBUG: Show a wizard to create something new.',
  kind: CommandKind.BUILT_IN,
  action: (): OpenDialogActionReturn => ({
    type: 'dialog',
    dialog: 'create',
  }),
};
