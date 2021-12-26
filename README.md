# @microsoft/repo-templates

> Microsoft's default repo templates

The **official, default** template at Microsoft is the one called **mit**.  If you combine the
files in the `shared/` folder with the files in `projections/mit`, you get the standard, default
set of files that new GitHub repos are placed with in the company.

# What is this?

These files are packaged as the default, standard recommended content for net new
GitHub repos created by Microsoft teams across all official Microsoft GitHub orgs such
as `microsoft`, `MicrosoftDocs`, `Azure`, etc.

This is not a GitHub repo template, however, since we have a number of different
orgs. Previous to 2020, this content was partially mirrored in the `microsoft.github.io` repo.

When Microsoft teams create new repos, either through internal tooling, or on GitHub directly,
these files are applied as sane defaults and help to encourage community.

Please help build the future of Microsoft open communities by making thoughtful contributions here.

These projects should be technology-agnostic.

## Microsoft template types

There are several `templates` Microsoft uses at this time, partly for historical
reasons, and also because there are different legal entities - some projects are
copyright Microsoft Corporation, while others are for the .NET Foundation.

The templates today are listed below. **The official, main, primary Microsoft template is called "mit"**:

### azure-samples

Sample projects intended for the legacy GitHub org `azure-samples` use this template. The `README.md` file
has a boilerplate set of headings to help people get started. The repo also has a robust `CONTRIBUTING.md` file
with guidance on issues, features, etc.

### contoso

Contoso is the Microsoft entity used for "fake demo companies, etc.". The Contoso template is used by
Microsoft's open source engineering system for validating the template system, but never used by actual
product teams.

### dnfmit.docs

Repos that consist primarily of documentation content that are intended for .NET Foundation projects
use this template. The template consists of a `LICENSE` covering docs, a `LICENSE-CODE` file covering
any code samples, and the `README.md` file has some additional language about trademarks in a
Legal Notices section.

### dnfmit

The standard default template for .NET Foundation projects that Microsoft teams may be helping work on
and release. Similar to the `mit` license.

### issueonly

An "issue-only" repo is a GitHub repository that primarily is used to report bugs, issues, and other
feedback, but not host or store code.

### microsoft.docs

Default template for docs-related repos that are used by the https://docs.microsoft.com site.

### mit

The standard, default template for Microsoft releases, placing an MIT `LICENSE` file and other
basics such as a `SECURITY.MD` file.

### official-sample-dnf

Official samples that are indexed at https://docs.microsoft.com/samples and also are copyright-assigned 
to the .NET Foundation use this template.

The `README.md` file has a rich metadata header with required fields and information that is processed
by the docs site. The template outlines some of the files that are placed.

Samples created through this mechanism are also configured automatically with a GitHub webhook that
connects with a sample publishing system.

### official-sample-microsoft

Official samples that are indexed at https://docs.microsoft.com/samples.

The `README.md` file has a rich metadata header with required fields and information that is processed
by the docs site. The template outlines some of the files that are placed.

Samples created through this mechanism are also configured automatically with a GitHub webhook that
connects with a sample publishing system.

### other

For some reason, we once thought that having an "other" template made sense. It may be a good
time to remove it.

## Structure of directories

### `shared` directory

The common directory contains defaults that all templates use unless overridden.

### `projections` directory

These are more specific templates for projects such as Microsoft official samples or
.NET Foundation projects.

## Output of the union of the directories

```
// psuedo-code
for (each templateName of projections) {
  copy(sharedFiles, excludingAnySpecialExclusions);
  copy(specificProjectionFiles);
}
```

# Contributing

This project welcomes contributions and suggestions.

## Pull request review

Pull requests to this repo will be reviewed, at a minimum, by the Open Source Programs Office at
Microsoft, as well as a set of Microsoft's "Open Source Champs", for guidance.

Please understand that these templates often need to be kept rather simple, since
they are a starting point, and if there is too much guidance, teams may not be familiar
with how to react and manage projects with too much initial content.

## Contribution requirements

Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
