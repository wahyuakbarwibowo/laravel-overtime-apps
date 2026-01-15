<?php

namespace App;

enum UserRole: string
{
    case STAF = 'staf';
    case LEADER = 'leader';
    case MANAGER = 'manager';
    case ADMIN = 'admin';
}
