# platziverse-deploy

## Commands for install dependencies with ansible (Mac)
- postgresql: `ansible-galaxy install ANXS.postgresql`
- redis: `ansible-galaxy install geerlingguy.redis`
- nginx: `ansible-galaxy install jdauphant.nginx`

## Commands for vagrant
- `vagrant init`
- On Vagrantfile, line 15, change `config.vm.box = "base"` to `config.vm.box = "ubuntu/xenial64"`
- `vagrant up`
- Enter to the instance that is running: `vagrant ssh`
- `sudo su -`
- `cd .ssh`
- `vim authorized_keys`
- Copy the public key (All the text that is in `ssh/deploy.pub` file)
- Exit from the instance with `exit`
- Login with ssh: `ssh root@127.0.0.1 -p 2222 -i ssh/deploy`

## Solution to "REMOTE HOST IDENTIFICATION HAS CHANGED" error on login with ssh
- `rm ~/.ssh/known_hosts`

## Commands for run playbooks with ansible:
- `ansible-playbook -i inventory.ini backend.yml --private-key ssh/deploy`
- `ansible-playbook -i inventory.ini frontend.yml --private-key ssh/deploy`

## Command for generate ssh key in ssh directory
- `ssh-keygen -t rsa -C "jorgechavezrnd@gmail.com - deploy"`
- On "Enter file in which to save the key (/Users/jorge/.ssh/id_rsa):" write `deploy` and enter
- For "passphrase", don't write anything and press enter with empty value
