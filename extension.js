const vscode = require("vscode");

/**
 * Wraps the selected text with the given prefix and suffix
 * @param {vscode.TextEditor} editor - The active text editor
 * @param {string} prefix - Text to add before selection
 * @param {string} suffix - Text to add after selection
 */
function wrapSelection(editor, prefix, suffix) {
  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);

  editor.edit(editBuilder => {
    editBuilder.replace(selection, `${prefix}${selectedText}${suffix}`);
  });
}

/**
 * Wraps the selected text with newlines and the given prefix/suffix
 * @param {vscode.TextEditor} editor - The active text editor
 * @param {string} prefix - Text to add before selection
 * @param {string} suffix - Text to add after selection
 */
function wrapSelectionWithNewlines(editor, prefix, suffix) {
  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);

  editor.edit(editBuilder => {
    editBuilder.replace(selection, `${prefix}\n${selectedText}\n${suffix}`);
  });
}

/**
 * Creates a markdown link from selected text
 * @param {vscode.TextEditor} editor - The active text editor
 */
async function createLink(editor) {
  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);

  const url = await vscode.window.showInputBox({
    prompt: "Enter URL",
    placeHolder: "https://example.com"
  });

  if (url) {
    editor.edit(editBuilder => {
      editBuilder.replace(selection, `[${selectedText}](${url})`);
    });
  }
}

/**
 * Shows a quick pick menu with all formatting options
 */
async function showFormattingMenu() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  // Only show if text is selected
  if (editor.selection.isEmpty) {
    vscode.window.showInformationMessage("Please select text to format");
    return;
  }

  // Only show in markdown files
  if (editor.document.languageId !== "markdown") {
    return;
  }

  const items = [
    {
      label: "$(bold) Bold",
      description: "Wrap with **text**",
      command: "markdown-formatter.bold"
    },
    {
      label: "$(italic) Italic",
      description: "Wrap with _text_",
      command: "markdown-formatter.italic"
    },
    {
      label: "$(dash) Strikethrough",
      description: "Wrap with ~~text~~",
      command: "markdown-formatter.strikethrough"
    },
    {
      label: "$(code) Inline Code",
      description: "Wrap with `text`",
      command: "markdown-formatter.code"
    },
    {
      label: "$(file-code) Code Block",
      description: "Wrap with ```text```",
      command: "markdown-formatter.codeBlock"
    },
    {
      label: "$(link) Link",
      description: "Create markdown link",
      command: "markdown-formatter.link"
    }
  ];

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: "Choose markdown formatting"
  });

  if (selected) {
    vscode.commands.executeCommand(selected.command);
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Markdown Formatter extension is now active");

  // Register command for bold formatting
  let boldCommand = vscode.commands.registerCommand("markdown-formatter.bold", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      wrapSelection(editor, "**", "**");
    }
  });

  // Register command for italic formatting
  let italicCommand = vscode.commands.registerCommand("markdown-formatter.italic", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      wrapSelection(editor, "_", "_");
    }
  });

  // Register command for strikethrough formatting
  let strikethroughCommand = vscode.commands.registerCommand(
    "markdown-formatter.strikethrough",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        wrapSelection(editor, "~~", "~~");
      }
    }
  );

  // Register command for inline code formatting
  let codeCommand = vscode.commands.registerCommand("markdown-formatter.code", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      wrapSelection(editor, "`", "`");
    }
  });

  // Register command for code block formatting
  let codeBlockCommand = vscode.commands.registerCommand("markdown-formatter.codeBlock", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      wrapSelectionWithNewlines(editor, "```", "```");
    }
  });

  // Register command for link formatting
  let linkCommand = vscode.commands.registerCommand("markdown-formatter.link", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      createLink(editor);
    }
  });

  // Register command for quick pick menu
  let quickPickCommand = vscode.commands.registerCommand("markdown-formatter.showMenu", () => {
    showFormattingMenu();
  });

  // Add all commands to subscriptions for proper cleanup
  context.subscriptions.push(
    boldCommand,
    italicCommand,
    strikethroughCommand,
    codeCommand,
    codeBlockCommand,
    linkCommand,
    quickPickCommand
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
